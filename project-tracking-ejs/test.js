function test() {

    try {
        const er = new Error()
        er.message = 'something went wrong'
        throw (er)
    } catch (e) {
        console.log(e.message)
    }

}

test()
