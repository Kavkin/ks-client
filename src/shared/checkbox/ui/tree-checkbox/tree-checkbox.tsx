import { TreeData } from '@atlaskit/tree'

import './tree-checkbox.css'

import TreeNode from './tree-node'
import React, { useEffect, useState, useTransition } from 'react'

import { CompSchema, emptyFunction } from '@/shared/schema-drawer'
import Tree, { buildTree } from '@/shared/tree'

interface ModalProps {
  name: string
  value: string[]
  schema: CompSchema
  onChange: (value: string[]) => void
  multiselect?: boolean
  searchQuery?: string
}

export default function TreeCheckbox(props: ModalProps): JSX.Element | null {
  const [tree, setTree] = useState<TreeData>()
  const [value, setValue] = useState<string[]>(props.value || [])
  const [, startTransition] = useTransition()

  useEffect(rebuildTree, [props.schema, value, props.searchQuery])

  function onChange(name: string) {
    if (props?.multiselect) {
      const clonedValue = [...value]
      const index = clonedValue.indexOf(name)

      if (index > -1) {
        clonedValue.splice(index, 1)
      } else {
        clonedValue.push(name)
      }

      setValue(clonedValue)
      props.onChange(clonedValue)
    } else {
      if (value.length === 0) {
        setValue([name])
        props.onChange([name])
      }
      if (value.length !== 0 && value.includes(name)) {
        setValue([])
        props.onChange([])
      }
    }
  }

  function rebuildTree() {
    startTransition(() => {
      const newTree = buildTree(tree, props.schema.data, {
        search: { fieldNames: ['title'], query: props.searchQuery },
        isInitialExpanded: false,
        isRoot: true,
        onChange,
        value,
      })
      setTree(newTree)
    })
  }

  if (tree === undefined) {
    return null
  }

  return (
    <Tree
      key={props.schema.id}
      tree={tree}
      renderItem={TreeNode}
      onDragEnd={emptyFunction}
      onDragStart={emptyFunction}
      setTree={setTree}
    />
  )
}
