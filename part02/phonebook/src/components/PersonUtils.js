

const findFreeId = data => {

    var id = 1

    while(true) {
        let found = false
        for (const element of data) {
            if(id === element.id) {
                found = true
                break
            }
        }
        if(!found) {
            return id
        }
        id++
    }


}

export default {findFreeId}