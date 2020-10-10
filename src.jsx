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
      query : null,
      query_being_shown : null
    };
  }

  search(){
    this.setState({query_being_shown : this.state.query});
  }
  query_changed(event){
    this.setState({query:event.target.value});
  }
  
  render() {

    return (
      <div className="searchdiv">
        <TextId value={this.state.query} onChange={(event)=>{this.query_changed(event)}} />
        <SearchBtn onClick={()=>{this.search()}} />
        <p>{this.state.query_being_shown}</p>
      </div>
    );
  }
}

ReactDOM.render(
    <SearchDiv />,
    document.getElementById('home')
  );