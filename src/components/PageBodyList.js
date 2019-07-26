import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../constants/actionTypes';
import { Card, Icon, Avatar } from 'antd';
import VideoEmbed from './VideoEmbed';
const { Meta } = Card;

function showList(items) {
  var listItems = items.map(function(item) {
    var img_src = '';
    var insta_link = '';
    var yt_link = '';

    if (item.entry_key) {
      img_src = "https://artworksbucket.s3.ap-south-1.amazonaws.com/" + item.entry_key + ".jpg";
      insta_link = "http://instagram.com/p/" + item.insta_link;
    }
    if (item.yt_link) {
      yt_link = "https://www.youtube.com/embed/" + item.yt_link + "";
    }

    return (
      <Card
        key={item.id} 
        style={{ margin: '0 30% 20px 30%' }}
        cover={(item.entry_key && (
            <img src={img_src}/>
          )) || (item.yt_link && (<VideoEmbed yt_link={item.yt_link} />))}
        actions={(item.entry_key && [<a href={insta_link} target="_blank">Find on Instagram</a>]) || (item.yt_link && [<Icon type="spotify" />, <Icon type="itunes" />, <Icon type="ellipsis" />])}
      >
        <Meta
          avatar={<Avatar src={img_src} />}
          title={item.title}
          description={item.body}
        />
      </Card>
    );
  });
  return listItems;
}

const PageBodyList = props => {
  var listItems = null;
  
  listItems = showList(props.items);
  
  return (
    <div>
      <div>{listItems}</div>
    </div>
  );
  
};

export default connect()(PageBodyList);
