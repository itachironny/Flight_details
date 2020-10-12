function SearchBtn(props) {
  return (
    <button className="searchbtn" onClick={() => props.onClick()}>
      Search
    </button>
  );
}

function TextId(props){
  return (
    <input type="text" value={props.value} onChange={props.onChange}/>
  );
}
class FlightDetails extends React.Component {
  constructor(props){
    super(props);
    this.state={is_tracking : false, last_tracked_lat : "", last_tracked_long : "" };
  }
  componentDidUpdate(prevProps) {
    //whenever rendering occurs with no flight to show, tracking is automatically stopped
    //props.value = null enforces state.is_tracking = false
    if(this.props.value==null) {
      //the checking must be done to stop infinite loops of rerendering
      if(this.state.is_tracking==true) this.setState({is_tracking:false});
    }
    else{
      //stop tracking only if previous flight is different
      if(prevProps.value!=null && this.props.value['fid']!== prevProps.value['fid']){
        this.setState({is_tracking:false});
      }
    }
    
  }
  track(){
    if(!this.state.is_tracking) return;
    //tracking code goes here
            //NOTE : another tracking must be scheduled only after one tracking request is complete 

  }
  toggleTracking(){
    this.setState({is_tracking:!this.state.is_tracking});
    if(this.state.is_tracking) this.track();
  }

  render(){

    //*********tracking ui with its track toggling feature

    //==== if flight tracking not needed, as no flight details is there
    var track_btn_msg=null,track_btn=null,track_table=null;

    //=== if tracking needed
    if(this.props.value!=null){

      if(this.state.is_tracking){
        track_btn_msg = "Stop tracking";
        track_table = (
          <table>
            <tr> <td>Latitude</td>     <td>{this.state.last_tracked_lat}</td> </tr>
            <tr> <td>Longitude</td>    <td>{this.state.last_tracked_long}</td> </tr>
          </table>
        );
      }

      else{
        track_btn_msg = "Start tracking";
      }

      track_btn = (
        <button className="tracking_btn" onClick={()=>{this.toggleTracking()}}>{track_btn_msg}</button>
      );
    }   //tracking needed ends
    

    return(
      <div className="flightdetails">
        <table>
          <tr> <td>Flight Number</td>     <td>{this.props.value!=null?this.props.value['fid']:""}</td> </tr>
          <tr> <td>Time of Flight</td>    <td>{this.props.value!=null?this.props.value['dep_time']:""}</td> </tr>
          <tr> <td>Origin</td>            <td>{this.props.value!=null?this.props.value['origin']:""}</td> </tr>
          <tr> <td>Destination</td>       <td>{this.props.value!=null?this.props.value['destination']:""}</td> </tr>
        </table>
        {track_btn} <br/>
        {track_table}
      </div>
    );
  }
}

function ErrorDiv(props){
  if(props.error_msg==="") return null;
  return(
    <div className="error_msg">
      <p> {props.error_msg} </p>
      <button onClick={() => props.onClick()}>Close</button>
    </div>
  );
}

class SearchDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query : "",
      error_msg : "",
      query_result : null,
    };
  }

  search(){
    var url = 'http://localhost:3000/'+this.state.query;

    fetch(url,{
    method: 'GET', //get method of fetching
    mode: 'no-cors'  //cross origins allowed
    })
    .then((response) => {
      //validate response status
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    //convert to json
    .then(response=> {return response.json()})
    //read json
    .then(
      (result) => {
        this.setState({
          error_msg: "",
          query_result : result
        });
        console.log(result);              // -----> watching the fetched response
      },
      //for trapping errors
      (error) => {
        this.setState({
          error_msg: "Error occured in fetching",
          query_result : null
        });
        console.log(error);              // -----> watching the fetching error
      }
    );
  }

  query_changed(event){
    this.setState({query:event.target.value});
  }
  error_cleared_by_user(){
    this.setState({error_msg:""});
  }
  
  render() {

    return (
      <div className="searchdiv">
        <TextId value={this.state.query} onChange={(event)=>{this.query_changed(event)}} />
        <SearchBtn onClick={()=>{this.search()}} />
        
         <br/>
        <ErrorDiv error_msg={this.state.error_msg} onClick={()=>{this.error_cleared_by_user()}} />

         <br/>
        <FlightDetails value={this.state.query_result} />

      </div>
    );
  }
}

ReactDOM.render(
    <SearchDiv />,
    document.getElementById('home')
  );