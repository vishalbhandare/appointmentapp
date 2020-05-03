import {apiServiceUrl, clientID, clientSecretKey, scope} from './../constant';
import axios from 'axios';
class AllService {
    static getAccessToken (requestParam) {
        return new Promise((resolve, reject) =>{
            axios.post(`${apiServiceUrl}/oauth/token`,{
                username: requestParam.email,
                password: requestParam.password,
                grant_type: 'password',
                client_id: clientID,
                client_secret: clientSecretKey,
                scope: scope
             }).then((response) => {   
                if (response.status == 200) {
                   localStorage.setItem('tokenDetail', JSON.stringify(response.data)) 
                   resolve(response.data)
                }
             }).catch((err) => {
                reject(err)
             })
        })
    }

    static loginUser (requestParam) {
        let loginDetail = {}  
        return new Promise((resolve, reject) =>{
            axios.post(`${apiServiceUrl}/api/login`,{
                email: requestParam.email,
                password: requestParam.password
             }).then((response) => {   
                if (response.status == 200) {
                    loginDetail = response 
                    return AllService.getAccessToken ({
                        email: requestParam.email,
                        password: requestParam.password})
                }
             }).then((response)=>{
                resolve(loginDetail)
             })
             .catch((err) => {
                reject(err)
             })
        })

    }

    static registerUser (requestParam) {
        let registerDetail = {} 
        return new Promise((resolve, reject) =>{
            axios.post(`${apiServiceUrl}/api/register`,{
                email: requestParam.email,
                password: requestParam.password,
                name: requestParam.name,
                c_password: requestParam.c_password
             }).then((response) => {   
                if (response.status == 200) {
                    registerDetail =  response
                    return AllService.getAccessToken ({
                        email: requestParam.email,
                        password: requestParam.password})
                }
             }).then((response)=>{
                resolve(registerDetail)
             })
             .catch((err) => {
                reject(err)
             })
        })

    }

    static getAllEventTypes () {
      return new Promise((resolve, reject) =>{
         let tokens = JSON.parse(localStorage.getItem('tokenDetail'))
         axios.get(`${apiServiceUrl}/api/user/event-types`,{
            headers: {'Authorization': 'Bearer ' + tokens.access_token}
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static getEventType (id) {
      return new Promise((resolve, reject) =>{
         let tokens = JSON.parse(localStorage.getItem('tokenDetail'))
         axios.get(`${apiServiceUrl}/api/user/event-types/${id}`,{
            headers: {'Authorization': 'Bearer ' + tokens.access_token}
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static getAllEvents (request) {
      return new Promise((resolve, reject) =>{
         let tokens = JSON.parse(localStorage.getItem('tokenDetail'))
         axios.get(`${apiServiceUrl}/api/user/events?type=${request.type}`,{
            headers: {'Authorization': 'Bearer ' + tokens.access_token}
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static updateEventType (id, requestParam) {
      return new Promise((resolve, reject) =>{
         let tokens = JSON.parse(localStorage.getItem('tokenDetail'))
         axios.put(`${apiServiceUrl}/api/user/event-types/${id}`,{
            name: requestParam.name,
            duration_min: requestParam.duration_min,
         },{
            headers: {'Authorization': 'Bearer ' + tokens.access_token}
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static createNewEventType (requestParam) {
      return new Promise((resolve, reject) =>{
         let tokens = JSON.parse(localStorage.getItem('tokenDetail'))
         axios.post(`${apiServiceUrl}/api/user/event-types`,{
            name: requestParam.name,
            duration_min: requestParam.duration_min,
         },{
            headers: {'Authorization': 'Bearer ' + tokens.access_token}
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static createNewEvent (requestParam) {
      return new Promise((resolve, reject) =>{
         axios.post(`${apiServiceUrl}/api/user/events`,{
            first_name: requestParam.firstname,
            last_name: requestParam.lastname,
            email: requestParam.email,
            scheduled_at: requestParam.scheduled_at,
            event_type_id: requestParam.event_type_id,
            scheduleCode: requestParam.scheduleCode,
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static createPasswordResetToken (requestParam) {
      return new Promise((resolve, reject) =>{
         axios.post(`${apiServiceUrl}/api/resetpassword`,{
            email: requestParam.email
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static verifyPasswordResetToken(requestParam) {
      return new Promise((resolve, reject) =>{
         axios.get(`${apiServiceUrl}/api/resetpassword/${requestParam.token}`).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static resetPasswordWithToken(requestParam) {
      return new Promise((resolve, reject) =>{
         axios.put(`${apiServiceUrl}/api/resetpassword`,{
            email: requestParam.email,
            password: requestParam.password,
            password_confirmation: requestParam.confirm_password,
            token: requestParam.token
         }).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }

    static getEventTypeByScheduleCode (requestParam) {
      return new Promise((resolve, reject) =>{
         axios.get(`${apiServiceUrl}/api/event-types-open/${requestParam.scheduleCode}`).then((response)=>{
               resolve(response)
         })
         .catch((err) => {
               reject(err)
            })
      })
    }
}
export default AllService;