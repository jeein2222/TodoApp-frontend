import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN="ACCESS_TOKEN";

export function call(api, method, request){
    let headers =new Headers({
        "Content-Type" : "application/json",
    });

    const accessToken=localStorage.getItem(ACCESS_TOKEN);
    if(accessToken && accessToken !== null){
        headers.append("Authorization", "Bearer "+accessToken);
    }

    let options={
        headers : headers,
        url:API_BASE_URL+api,
        method: method
    };


    if(request){
        //GET METHOD
        options.body=JSON.stringify(request);
    }

    return fetch(options.url, options)
    .then((response)=>
        response.json().then((json)=> {
            if(!response.ok){
                //response.ok가 true이면 정상적인 응답을 받은 것이고 아니면 에러 응답을 받은 것임.
                return Promise.reject(json);
            }
            return json;
        })
    )
    .catch((error) => {
        console.log(error.status);
        if(error.status === 403) {
            window.location.href="/login";
        }
        return Promise.reject(error);
    });
}

export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
        .then((response)=>{
            if(response.token){
                //로컬 스토리지에 토큰 저장
                localStorage.setItem(ACCESS_TOKEN, response.token);
                window.location.href="/";
            }
        });
}

export function signout(){
    localStorage.setItem(ACCESS_TOKEN,null);
    window.location.href="/login";

}

export function signup(userDTO){
    return call("/auth/signup","POST",userDTO);
}