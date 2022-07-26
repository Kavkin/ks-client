import { ITextFieldProps } from '@fluentui/react'

import './editable-text.css'

import React, { useEffect, useRef, useState } from 'react'

import { removeSelection } from '@/lib/dom-utils'
import { isEnter } from '@/lib/key-events'
import TextField from '@/shared/textfield'

interface EditableTextProps extends ITextFieldProps {
  setIsEditing?: (isEditing: boolean) => void
  initialIsEditing?: boolean
  isEditing?: boolean
}

const textFieldStyles = {
  fieldGroup: { border: '1px solid transparent' },
}

export default function EditableText(props: EditableTextProps): JSX.Element {
  if (props.initialIsEditing !== undefined && props.isEditing !== undefined) {
    throw new Error('Pass prop initialIsEditing or isEditing')
  }

  const ref = useRef<HTMLDivElement | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const isInit = useRef(true)

  const [isLocalEditing, setIsLocalEditing] = useState(props.initialIsEditing ?? false)
  const isEditing = props.isEditing ?? isLocalEditing

  useEffect(setFocusOrRemoveSelection, [isEditing])
  useEffect(handleClickOutside, [isEditing])

  function setIsEditing(newValue: boolean) {
    if (props.isEditing !== undefined) {
      props.setIsEditing?.(newValue)
    } else {
      setIsLocalEditing(newValue)
    }
  }

  function setFocusOrRemoveSelection() {
    if (isInit.current) {
      isInit.current = false
      return
    }

    if (isEditing) {
      setTimeout(() => rootRef.current?.querySelector<HTMLInputElement>('input')?.focus())
    } else {
      setTimeout(removeSelection)
    }
  }

  function handleClickOutside() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function clickOutside(event: any) {
      if (!rootRef.current?.contains(event?.target)) {
        setIsEditing(false)
      }
    }

    document.addEventListener('click', clickOutside)

    return () => {
      document.removeEventListener('click', clickOutside)
    }
  }

  return (
    <div className="EditableText" ref={rootRef}>
      <div style={{ visibility: !isEditing ? 'hidden' : 'visible' }}>
        <TextField
          {...props}
          key={isEditing.toString()}
          styles={!isEditing ? textFieldStyles : undefined}
          value={isEditing ? props.value : undefined}
        />
      </div>
      {!isEditing && (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (isEnter(e)) {
              setIsEditing(true)
            }
          }}
          className="text"
          onDoubleClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={{
            __html: (props.value === undefined ? props.defaultValue : props.value) || '',
          }}
          ref={ref}
        />
      )}
    </div>
  )
}
