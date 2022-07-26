import { TreeData, TreeItem } from '@atlaskit/tree'
import { assertNotUndefined } from '@savchenko91/schema-validator'

import { walk } from './walk'

import { ROOT_ID } from '@/constants/common'
import { Entity } from '@/lib/entity-actions'
import { Dictionary } from '@/shared/schema-drawer'

export type AdditionalData = {
  isInitialExpanded: boolean
  isRoot?: boolean
  search?: {
    query?: string
    fieldNames: string[]
  }
} & Record<string, unknown>

export function buildTree(
  tree: TreeData | undefined,
  entities: Dictionary<Entity> | undefined,
  additionalData: AdditionalData
): TreeData | undefined {
  if (entities === undefined) {
    return undefined
  }

  const rootEntity = entities[ROOT_ID]
  assertNotUndefined(rootEntity)

  const rootTreeItem = {
    id: 'rootId',
    isExpanded: true,
    children: [] as string[],
  }

  const items = additionalData.search?.query
    ? buildTreeWithSearchQuery(rootEntity, tree, entities, additionalData)
    : buildTreeDefault(rootEntity, tree, entities, additionalData)

  const itemsRoot = { rootId: rootTreeItem, ...items }

  if (items[ROOT_ID]) {
    itemsRoot.rootId.children.push(ROOT_ID)
  }

  return {
    rootId: additionalData.isRoot ? rootTreeItem.id : ROOT_ID,
    items: additionalData.isRoot ? itemsRoot : items,
  }
}

// Private

function buildTreeWithSearchQuery(
  rootEntity: Entity,
  tree: TreeData | undefined,
  entities: Dictionary<Entity>,
  additionalData: AdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}
  const parentIds: Record<string, string> = {}

  walk(rootEntity, entities, 'id', (entity, id, data, parentId) => {
    const isExpandedBeforeSearchQuery = tree?.items[id]?.data.isExpandedBeforeSearchQuery

    if (parentId !== undefined) {
      parentIds[id] = parentId
    }

    const isFound = additionalData.search?.fieldNames.some((fieldName) => {
      return new RegExp(additionalData.search?.query || '', 'i').test(entity[fieldName])
    })

    if (isFound) {
      items[id] = {
        id: id,
        isExpanded: additionalData.isInitialExpanded,
        hasChildren: entity.children !== undefined,
        children: [],
        data: { entity, isExpandedBeforeSearchQuery, ...additionalData },
      }
    }
  })

  function addParents(id: string) {
    const parentId = parentIds[id]

    if (parentId === undefined) {
      return
    }

    const parentItem = items[parentId]
    const parentEntity = entities[parentId]

    if (parentItem === undefined) {
      items[parentId] = {
        id: parentId,
        isExpanded: true,
        hasChildren: true,
        children: [id],
        data: { entity: parentEntity, ...additionalData },
      }
    } else {
      parentItem.children = [...new Set([...parentItem.children, id])]
    }

    addParents(parentId)
  }

  Object.keys(items).forEach(addParents)

  return items
}

function buildTreeDefault(
  rootEntity: Entity,
  tree: TreeData | undefined,
  entities: Dictionary<Entity>,
  additionalData: AdditionalData
): Record<string, TreeItem> {
  const items: Record<string, TreeItem> = {}

  walk(rootEntity, entities, 'id', (entity, id) => {
    const isExpanded = tree?.items[id]?.isExpanded ?? additionalData.isInitialExpanded

    items[id] = {
      id,
      isExpanded,
      hasChildren: entity.children !== undefined,
      children: entity.children || [],
      data: { entity, isExpandedBeforeSearchQuery: isExpanded, ...additionalData },
    }
  })

  return items
}
