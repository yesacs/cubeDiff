import fs from 'node:fs/promises';

async function read(filename) {
  try {
    const data = await fs.readFile(filename, { encoding: 'utf8' });
    return data.split('\n')
  } catch (err) {
    console.log(err);
    return []
  }
}

async function write(contents) {
  try {
    await fs.writeFile('./diff.txt', contents);
  } catch (err) {
    console.log(err);
  }
}

Promise.all([
  read('./myCube.txt'),
  read('./thePauperCube.txt')
]).then(([myCube, thePauperCube]) => {
  const diff = thePauperCube.reduce((ret, test) => {
    if (myCube.includes(test)) return ret
    else return [...ret, test]
  }, []).sort()

  write(diff.map(c => `1 ${c}\n`))
})

