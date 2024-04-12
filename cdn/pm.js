//Copyright 2024 Zymono, Toggled.tech, and all contributors. All Rights Reserved.

const scriptName = 'jscript'

const script = document.createElement('script');
script.type = "importmap";
script.defer = true;
script.setAttribute('id', 'sjpm-imports')

fetch('https://sjpm.vercel.app/api/v1/pm', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
}).then(response => response.json())
  .then(data => {
    console.log(data)
    script.textContent = JSON.stringify(data);
    document.body.appendChild(script);

    document.querySelectorAll(scriptName).forEach(script => {
      const code = script.textContent
      const scr = document.createElement('script')
      scr.type = "module"
      scr.textContent = code
      scr.setAttribute('src', script.getAttribute('src'))

      script.parentNode.replaceChild(scr, script)
    })
  })
  .catch(error => console.error('Error fetching import map:', error));

const style = document.createElement('style');
style.type = "text/css";
style.textContent = `${scriptName} { display: none; }`;
document.head.appendChild(style); 

// async function require(file) {
//   try {
//     const response = await fetch(`https://cdn.jsdelivr.net/npm/${file}`);
//     if (!response.ok) {
//       throw new Error(`Failed to retrieve file: ${response.status} ${response.statusText}`);
//     }
//     const code = await response.text();

//     const workingCode = String(code.replaceAll('module.exports', 'export')).split('export')[0]
    
//     // return new Function(workingCode);
//     const script = document.createElement('script');
//     script.type = "module";
//     script.textContent = workingCode;
//     document.body.appendChild(script);
//   } catch (error) {
//     throw new Error(`Failed to retrieve file: ${error.message}`);
//   }
// }
