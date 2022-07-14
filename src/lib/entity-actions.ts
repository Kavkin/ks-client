import { assertNotUndefined, isString } from '@savchenko91/schema-validator'

import uniqid from 'uniqid'

import { ROOT_ID } from '@/constants/common'
import { insert, remove, replace, replaceById } from '@/lib/change-unmutable'
import { Dictionary } from '@/shared/schema-drawer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Entity extends Record<string, any> {
  id: string
  children?: string[]
}

export function findDependencyIds(ids: string[], entities: Dictionary<Entity>): string[] {
  const newIds = ids.reduce(
    (accIds, id) => {
      const entity = findEntity(id, entities)

      if (entity.children) {
        return [...accIds, ...entity.children]
      }

      return accIds
    },
    [...ids]
  )

  const newUniqIds = [...new Set(newIds)]

  if (ids.length === newUniqIds.length) {
    return newUniqIds
  }

  return findDependencyIds(newUniqIds, entities)
}

/**
 * @param uniqKeys keys in object which value must to be uniq thus autogenerated
 */
export function copyEntity<T extends Entity>(entity: T, uniqKeys: string[] = []): T {
  const newUniqKeys = ['id', ...uniqKeys]

  return newUniqKeys.reduce((acc, keyName) => {
    if (acc[keyName]) {
      return {
        ...acc,
        [keyName]: uniqid(),
      }
    }

    return acc
  }, entity)
}

/**
 * @param uniqKeys keys in object which value must to be uniq thus autogenerated
 */
export function copyEntities<T extends Entity>(entities: Dictionary<T>, uniqKeys: string[] = []): Dictionary<T> {
  return Object.values(entities).reduce<Dictionary<T>>((accEntities, entity) => {
    const hasParent = !!Object.values(accEntities).find(({ children }) => children?.includes(entity.id))
    const newEntity = copyEntity(entity, uniqKeys)

    if (!hasParent) {
      const entitiesWithRemoved = remove(accEntities, entity.id)
      const entitiesWithPasted = insert(entitiesWithRemoved, newEntity.id, newEntity)
      return entitiesWithPasted
    }

    const position = findEntityPosition(entity.id, accEntities)
    assertNotUndefined(position)
    const entitiesWithRemoved = removeOnlyEntity(entity.id, accEntities)
    assertNotUndefined(entitiesWithRemoved)
    const entitiesWithPasted = addEntity(newEntity, position.parentId, position.index, entitiesWithRemoved)

    return entitiesWithPasted
  }, entities)
}

/*
  Полезна когда копируем несколько сущностей с вложенностью и надо найти какие из них родители
*/
export function findRootParentIds<T extends Entity>(entities: Dictionary<T>): string[] {
  return Object.values(entities).reduce<string[]>((acc, entity) => {
    const parent = findParent(entity.id, entities)
    if (!parent) {
      acc.push(entity.id)
    }
    return acc
  }, [])
}

export function findParent<T extends Entity>(id: string | number, entities: Dictionary<T>): T | undefined {
  return Object.values(entities).find(({ children }) => children?.includes(id.toString()))
}

export function findParents<T extends Entity>(id: string | number, entities: Dictionary<T>): Entity[] | undefined {
  const parent = findParent(id, entities)

  if (!parent) {
    return undefined
  }

  const parentsOfParent = findParents(parent.id, entities)

  if (!parentsOfParent) {
    return [parent]
  }

  return [...parentsOfParent, parent]
}

export function findEntityPosition<T extends Entity>(
  entityId: string,
  entities: Dictionary<T>
): { index: number; parentId: string } | undefined {
  const parentEntity = findParent(entityId, entities)

  if (parentEntity === undefined) {
    return undefined
  }

  if (entityId === ROOT_ID) {
    return { index: 0, parentId: parentEntity.id }
  }
  const index = parentEntity.children?.indexOf(entityId)

  assertNotUndefined(index)

  return {
    index,
    parentId: parentEntity.id,
  }
}

export function findEntity<T extends Entity>(id: string | number, entities: Dictionary<T>): T {
  const entity = entities[id]
  assertNotUndefined(entity)
  return entity
}
export function findEntities<T extends Entity>(ids: string[], entities: Dictionary<T>): Dictionary<T> {
  return ids.reduce<Dictionary<T>>((acc, id) => {
    acc[id] = findEntity(id, entities)
    return acc
  }, {})
}
export function filterEntities<T extends Entity>(entities: Dictionary<T>, cb: (entity: T) => unknown): Dictionary<T> {
  return Object.values(entities)
    .filter(cb)
    .reduce<Dictionary<T>>((acc, { id }) => {
      acc[id.toString()] = findEntity(id.toString(), entities)
      return acc
    }, {})
}

// CHILD ID

/**
 * Returns parent entity
 */
export function removeChildId<T extends Entity>(entity: T, childIdOrIndex: string | number): T {
  assertNotUndefined(entity.children)

  const index = isString(childIdOrIndex) ? entity.children.indexOf(childIdOrIndex) : childIdOrIndex

  if (index === -1) {
    throw new Error('child does not exist in entity')
  }

  const newChildren = remove(entity.children, index)

  // Поле children не должно существовать если дети отсутствуют
  if (newChildren.length === 0) {
    return remove(entity, 'children')
  }

  return replace(entity, 'children', newChildren)
}

export function addChildId<T extends Entity>(parententity: T, entityId: string, index: number): T {
  if (index < 0) {
    throw new Error('Index cannot be less than 0')
  }

  const childLength = parententity?.children?.length ?? 0

  if (index > childLength) {
    throw new Error(`Index cannot be more than ${childLength}`)
  }

  const parentClone = { ...parententity, children: parententity?.children ?? [] }

  const newChildren = insert(parentClone.children, index, entityId)
  const newParententity = replace(parentClone, 'children', newChildren)

  return newParententity
}

// entities

export function removeEntity<T extends Entity>(
  entityId: string | number,
  entities: Dictionary<T>
): Dictionary<T> | undefined {
  const parentEntity = findParent(entityId, entities)

  // undefined if we remove root
  if (parentEntity === undefined) {
    return undefined
  }

  const entityToRemove = findEntity(entityId, entities)
  assertNotUndefined(entityToRemove)

  // Remove children recursively
  const entitiesWithoutChildren =
    entityToRemove.children?.reduce<Dictionary<T> | undefined>((accEntities, id) => {
      if (accEntities) {
        return removeEntity(id, accEntities)
      }
      return accEntities
    }, entities) ?? entities

  // Remove from entities
  const newEntities = remove(entitiesWithoutChildren, entityId)
  // Remove from parent
  const newParentEntity = removeChildId(parentEntity, entityId)

  return replaceById(newParentEntity, newEntities)
}

/**
 * Removes only one entity without going deep
 */
export function removeOnlyEntity<T extends Entity>(
  entityId: string | number,
  entities: Dictionary<T>
): Dictionary<T> | undefined {
  const parentEntity = findParent(entityId, entities)

  // undefined if we remove root
  if (parentEntity === undefined) {
    return undefined
  }
  // Remove from entities
  const newEntities = remove(entities, entityId)
  // Remove from parent
  const newParentEntity = removeChildId(parentEntity, entityId)

  return replaceById(newParentEntity, newEntities)
}

export function addEntity<T extends Entity>(
  entity: T,
  newParentId: string | number,
  newIndex: number,
  entities: Dictionary<T>
): Dictionary<T> {
  const parentEntity = findEntity(newParentId, entities)
  // Add childId to parent

  const newParententity = addChildId(parentEntity, entity.id, newIndex)
  // Add parent to entities
  const entitiesWithNewParentEntity = replaceById(newParententity, entities)

  const newEntities = insert(entitiesWithNewParentEntity, entity.id, entity)

  return newEntities
}

export function moveEntity<T extends Entity>(
  entity: T,
  toParentId: string | number,
  newIndex: number,
  entities: Dictionary<T>
): Dictionary<T> {
  const entitiesWithoutMovingEntity = removeOnlyEntity(entity.id, entities)
  assertNotUndefined(entitiesWithoutMovingEntity)
  const entitiesWithMovingentity = addEntity(entity, toParentId, newIndex, entitiesWithoutMovingEntity)

  return entitiesWithMovingentity
}