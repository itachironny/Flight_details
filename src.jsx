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

function Table(props){
  return(
    <table>
      <tr> <td>Flight Number</td>     <td>{props.value!=null?props.value['fid']:""}</td> </tr>
      <tr> <td>Time of Flight</td>    <td>{props.value!=null?props.value['dep_time']:""}</td> </tr>
      <tr> <td>Origin</td>            <td>{props.value!=null?props.value['origin']:""}</td> </tr>
      <tr> <td>Destination</td>       <td>{props.value!=null?props.value['destination']:""}</td> </tr>
    </table>
  );
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
        <ErrorDiv error_msg={this.state.error_msg} onClick={()=>{this.error_cleared_by_user()}} />
        <Table value={this.state.query_result} />
      </div>
    );
  }
}

ReactDOM.render(
    <SearchDiv />,
    document.getElementById('home')
  );