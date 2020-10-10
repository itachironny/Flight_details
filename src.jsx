class SearchBtn extends React.Component {
  render() {
    return (
      <button className="searchbtn" onClick={() => this.props.onClick()}>
        Search
      </button>
    );
  }
}

class TextId extends React.Component {
  render(){
    return (
      <input type="text" value={this.props.value} onChange={this.props.onChange}/>
    );
  }
}

class SearchDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query : "",
      is_result : false,
      query_result : null,
      result_show :""
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
          is_result: true,
          query_result : result
        });
        console.log(result);              // -----> watching the fetched response
      },
      //for trapping errors
      (error) => {
        this.setState({
          is_result: false,
          query_result : null
        });
        console.log(error);              // -----> watching the fetching error
      }
    );
  }

  query_changed(event){
    this.setState({query:event.target.value});
  }
  
  render() {

    return (
      <div className="searchdiv">
        <TextId value={this.state.query} onChange={(event)=>{this.query_changed(event)}} />
        <SearchBtn onClick={()=>{this.search()}} />
        <p>{this.state.result_show}</p>
      </div>
    );
  }
}

ReactDOM.render(
    <SearchDiv />,
    document.getElementById('home')
  );