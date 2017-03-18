exports.genLinks = (links) ->
  out = '<ul>'
  for own index, link of links.split /\r?\n/
    [name, url, title] = link.split '|'
    if name && url
      out += "<li><a target=\"_blank\" href=\"#{url}\" title=\"#{if title then title else name}\">#{name}</a>"
  out + '</ul>'
