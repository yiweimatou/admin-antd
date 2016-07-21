import { handleActions } from 'redux-actions'

const initialState = {
    isAuthed:false,
    loading:false,
    key:0,
    token:'',
    lastLoginTime:0
}

const auth = handleActions({
    ['login']:state => ({
        ...state,
        loading:true
    }),
    ['login/success']: (state,action) => ({
        ...state,
        loading:false,
        key:action.payload.key,
        token:action.payload.token,
        lastLoginTime:action.payload.lastLoginTime
    }),
    ['login/failure']:(state,action) => ({
        ...state,
        loading:false,
        lastLoginTime:action.payload.lastLoginTime
    })
},initialState)

export default auth