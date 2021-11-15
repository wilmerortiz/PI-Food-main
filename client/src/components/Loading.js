import loading from "../assets/img/loading.gif"
const Loading = () => {
    return(
        <div style={{background: '#FFF', width: '20%', borderRadius: '12px', textAlign:'center', margin: '0 auto'}}>
            <img src={loading} alt="" style={{width: '100%', borderRadius: '12px'}}/>
            <h2 style={{marginBottom: '1.5rem'}}>Loading ...</h2>
        </div>
    )
}

export default Loading