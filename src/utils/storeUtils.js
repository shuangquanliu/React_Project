import store from 'store'




export function setstore(user){
    store.set('USER-KEY',user)
}

export function getstore(){
    return store.get('USER-KEY') || {}
}

export function removestore(){
    store.remove('USER-KEY')
}