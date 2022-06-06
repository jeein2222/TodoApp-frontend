import {call,signout} from "./service/ApiService";
import AddTodo from './AddTodo';
import Todo from './Todo';
import React from 'react';
import { Paper, List ,Container, Grid, Button, AppBar, Toolbar, Typography} from "@material-ui/core";
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props); //부모 생성자 반드시 호출해야 함.
    this.state={
      items: [],
      loading:true,
    }
  }

  add=(item) => {
    // const thisItems=this.state.items;
    // item.id="ID-"+thisItems.length;
    // item.done=false;
    // thisItems.push(item);
    // this.setState({items:thisItems});
    // console.log("items : ",this.state.items);
    call("/todo","POST",item).then((response) =>
        this.setState({items:response.data})  
      );
  }

  delete=(item) =>{
    // const thisItems=this.state.items;
    // console.log("Before Update Items : ",this.state.items)
    // const newItems=thisItems.filter(e => e.id!==item.id);
    // this.setState({items:newItems},() => {
    //   console.log("Update Items : ",this.state.items)
    // });
    call("/todo","DELETE",item).then((response)=>
      this.setState({items:response.data})
    )
  }

  update=(item) =>{
    call("/todo","PUT",item).then((response)=>
      this.setState({items:response.data})
    );
  }


  componentDidMount(){
    call("/todo","GET",null).then((response) =>
      this.setState({items:response.data, loading:false})
    )
  }

  render(){
    //navigationBar 추가
    var navigationBar=(
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할 일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );


    //<Todo> 컴포넌트 배열
    var todoItems = this.state.items.length>0 && (
      <Paper style={{margin:16}}>
        <List>
          {this.state.items.map((item,idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update}/>
          ))}
        </List>
      </Paper>
    );

    //로딩중이 아닐 때
    var todoListPage=(
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="Todolist">{todoItems}</div>
        </Container>
      </div>
    );
  
    //로딩중일 때
    var loadingPage=<h1> 로딩중 ...</h1>;
    var content=loadingPage;

    if(!this.state.loading){
      content=todoListPage;
    }

    return <div className="App">{content}</div>;
  }
}

export default App;