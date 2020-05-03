import {Layout,  Breadcrumb, PageHeader, Avatar, icons, List, Alert, notification} from 'antd';
import NavigateBar from '../components/navigate';
import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
import "../asset/board.css"


const { Header, Footer, Sider, Content } = Layout;
let posts = [
    {title:"qwe", content:"zheshiyige", id:1},
    {title:"qwer", content:"zheshiyigeqwe", id:2},
    {title:"qwert", content:"zheshiyigeqwertr", id:3},
    {title:"qwetyu", content:"zheshiyigeasdsfsf", id:4},
    {title:"qwetyui", content:"zheshiyigeasdsfsfzxc", id:5}
];
export default class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type : "", //板块类型
            token : "", //验证
        }
    }
    render() {
        this.state.token = cookie.load("token");
        let formData = new FormData();
        formData.append('token',this.state.token);
        this.state.type = type();
        let postsTemp = axios.post("/api/board/"+type());
        return(
            <Layout className="layout">
                <NavigateBar />
                <PageHeader style={{padding: '20px 50px'}} title={title(this.state.type)}/>
                <Content style={{padding: '0px 50px'}}>   
                    <List
                        pagination={{
                        onChange: page => {
                          console.log(page);
                        },
                        pageSize: 3,
                        }}
                        itemLayout="horizontal"
                        dataSource={posts}
                        renderItem={item => (
                        <List.Item actions={[<a href={'/post/'+item.id}>detail</a>]}>
                            <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<div>{item.title}</div>}
                            description={<div>description</div>}
                            />
                        </List.Item>
                        )}
                    />
                </Content>
                <Footer style={{textAlign: 'center'}}>Design ©2020 by Group I</Footer>
            </Layout>
      );
    }
    
}
function type(){
    var url = window.location.href;
    var content = url.split("/");
    if(content.length<5)
        return "study";
    else {
        return content[4];
    }
}

function title(type){
    if(type==null)
        return "板块信息";
    else {
        if(type == "emotion")
            return "情感板块";
        else if(type == "information")
            return "校园信息板块";
        else if(type == "internship")
            return "实习信息板块";
        else if(type == "study")
            return "学习板块";
    }
}