import { connect } from 'react-redux'
import Main from '../components/Main'

const mapStateToProps = state=>({
    auth:state.auth
})

const mapDispatchToProps = dispatch =>({
    login({account,pwd}){
        dispatch({
            type:'login',
            payload:{
                account,pwd
            }
        })
    },
    logout(){
        dispatch({
            type:'logout'
        })
    }
})

export default connect( mapStateToProps,mapDispatchToProps )(Main)

