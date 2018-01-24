function asyncThing(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), 100)
    })
}

async function main() {
    return [1, 2, 3, 4].filter(async(value) => {
        const v = await asyncThing(value)
        return v > 2;
    })
}

main().then(v => console.log(v)).catch(err => console.error(err))
