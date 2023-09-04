import Link from 'app/components/link'
import React from 'react'

export default function getAuthorLinks(authors = []) {
  if (!authors.length) {
    return []
  }

  const authorLinks = authors.map(a => (
    <Link color='gray' key={ a.uuid } to={ `/authors/${ a.slug }` }>{ a.name }</Link>
  ))

  const lastAuthorLink = authorLinks.pop()
  const commaJoined = authorLinks.reduce((joined, link, idx) => {
    if (idx === authorLinks.length - 1) {
      return joined.concat(link)
    } else {
      return joined.concat([link, <span key={ idx }>,&nbsp;</span>])
    }
  }, [])

  return commaJoined.length === 0
    ? [lastAuthorLink]
    : commaJoined.length === 1
      ? commaJoined.concat([<span key='and'>&nbsp;and&nbsp;</span>, lastAuthorLink])
      : commaJoined.concat([<span key='and'>,&nbsp;and&nbsp;</span>, lastAuthorLink])
}
