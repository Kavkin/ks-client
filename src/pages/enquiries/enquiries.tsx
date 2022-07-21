import { DetailsList } from '@fluentui/react'

import './enquiries.css'

import React, { useEffect, useState } from 'react'

const columns = [
  { key: 'column1', name: 'Имя', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Телефон', fieldName: 'phone', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column3', name: 'Комментарий', fieldName: 'comment', minWidth: 100, maxWidth: 200, isResizable: true },
]

export default function Enquiries(): JSX.Element {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('api/v1/enquiries')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])
  return <div className="Main Enquiries">{isLoaded && !error && <DetailsList items={items} columns={columns} />}</div>
}
