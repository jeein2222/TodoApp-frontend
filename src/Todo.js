import React from 'react';
import {ListItem,ListItemText,InputBase,Checkbox,ListItemSecondaryAction,IconButton} from "@material-ui/core";
//모듈에서 import를 할때 default export가 아닌 그냥 export되면 중괄호 
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Todo extends React.Component{
    constructor(props){
        super(props);//자바스크립트는 언어적 제약사항으로서 생성자에서 super를 호출하기 전에는 this 사용 불가
        this.state={item:props.item, readOnly:true};
        this.delete=props.delete;
        this.update=props.update;
        //부모로부터 물려받은 props의 item 속성이 담긴 객체를 state의 item 속성에 담는다.
      }
    deleteEventHandler = () =>{
        this.delete(this.state.item);
    }

    offReadOnlyMode = () => {
        console.log("Event!",this.state.readOnly);
        this.setState({readOnly :false}, () => {
            console.log("ReadOnly? ",this.state.readOnly)
        });
    }

    enterKeyEventHandler=(e) => {
        if(e.key==="Enter"){
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    };

    editEventHandler = (e) => {
        const thisItem=this.state.item;
        thisItem.title=e.target.value;
        this.setState({item:thisItem});
        this.update(this.state.item);
    }

    checkboxEventHandler = (e) => {
        const thisItem=this.state.item;
        thisItem.done=!thisItem.done;
        this.setState({item:thisItem});
        this.update(this.state.item);
    }

    render(){ //state의 값이 변경되면 자동으로 렌더링이 다시 일어남.
        //JSX에서 자바스크립트 변수를 사용하려면 {}로 묶음.
        const item=this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase //a simple building block for creating an input
                        inputProps={{
                            "aria-label":"naked",
                            readOnly : this.state.readOnly
                        }}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onChange={this.editEventHandler}
                        onKeyPress={this.enterKeyEventHandler}
                        />
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Todo" onClick={this.deleteEventHandler}>
                        <DeleteOutlined/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
           
        );
    }
}

export default Todo;