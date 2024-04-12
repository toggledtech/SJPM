//The offical SJMP essentials
const loadScript = (project) => {
  const imports = JSON.parse(document.getElementById('sjpm-imports').textContent)

  const projectID = String(project).replaceAll('/', '_')
  const scripturl = imports.imports[projectID]
  const script = document.createElement('script')
  script.type = "module"
  script.src = scripturl
  script.setAttribute('src', scripturl)
  document.body.appendChild(script)
}

const require = (project) => {
  try {
    const projectID = String(project).replaceAll('/', '_')
    const scripturl = `https://sjpm.vercel.app/api/v1/personal/${projectID}`

    const script = document.createElement('script')
    script.type = "module"
    script.src = scripturl
    script.setAttribute('src', scripturl)
    document.body.appendChild(script)

    return true
  } catch (err) {
    return err
  }
}

const post = async (project, body) => {

  try {
    const projectID = project.replaceAll('/', '_')

    return await fetch('https://sjpm.vercel.app/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ project: projectID, body })
    })
  } catch (err) {
    return err
  }
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error));
}

const requireNode = async (p) => {
    const script = document.createElement('script')
    script.type = "module"
    script.src = `https://cdn.jsdelivr.net/npm/${p}`
    script.setAttribute('src', `https://cdn.jsdelivr.net/npm/${p}`)
    document.body.appendChild(script)
}

export { require, loadScript, post, requireNode };

export default {
  require, loadScript, post, requireNode
}