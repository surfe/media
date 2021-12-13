window.addEventListener("message", receiveMessage, false)

function receiveMessage(message) {
  if (message.origin !== "https://www.linkedin.com") return
  if (!message.data) return
  if (!message.data.link) return
  if (!message.data.link.startsWith("https://www.linkedin.com")) return
  if (!message.data.type) return
  if (message.data.type !== "ROUTE_REDIRECT") return

  var re = /https:\/\/www\.linkedin\.com(.*)/g
  var match = re.exec(message.data.link)
  if (match.length < 2) return

  const link = match[1]
  const app = window.Ember.A(window.Ember.Namespace.NAMESPACES).filter(n => n.name === "extended")[0]
  const r = app.__container__.lookup("service:router")
  r.transitionTo(link)
}
