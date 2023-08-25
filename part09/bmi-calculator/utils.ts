export const containsNumbers = (argument: any[]): boolean => {
    for( const n of argument) {
        if(isNaN(Number(n))) {
            return false
        }
    }

    return true
}

export default "this is the default..."