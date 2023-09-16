
export const patch = (url: string, body:any)=>{
    return fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

export const post = (url: string, body:any)=>{
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
}

export const get = (url: string)=> fetch(url)