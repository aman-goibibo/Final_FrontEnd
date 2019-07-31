import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import StoryTemplate from "./StoryTemplate";
import {
  getStoryQuery,
  getVideoQuery,
  getNewsQuery,
  getStoryForTag
} from "../queries/query";
import ReactYoutubeCard from "./ReactYoutubeCard";
import NewsCard from "./NewsCard";

class MainComponent extends Component {
  displayStory() {
    var data = this.props.getStoryForTag;
    if (data.loading) {
      return <div>Loading Stories . . .</div>;
    } else {
      return data.StoryFeed.map(story => {
        return (
          <div id="card--content" key={story.id}>
            <StoryTemplate
              key={story.id}
              storyTitle={story.title}
              subStory={story.subStory}
            /><h5 className="story-title">{story.title}</h5>
          </div>
        );
      });
    }
  }

  getVideos() {
    var data = this.props.getVideoQuery;

    if (data.loading) {
      return <div>Loading . . .</div>;
    } else {
      return data.VideoFeed.map(video => {
        return <ReactYoutubeCard videoId={video.videoId} key={video.videoId} />;
      });
    }
  }
  getNews() {
    var id = 0;
    var data = this.props.getNewsQuery;
    if (data.loading) {
      return <div>Loading . . .</div>;
    } else {
      return data.NewsFeed.map(news => {
        id++;
        return (
          <NewsCard
            src={news.urlToImage}
            link={news.url}
            title={news.title}
            description={news.description}
            author={news.author}
            key={id}
          />
        );
      });
    }
  }

  // componentDidUpdate(prevProps) {

  //         this.props.getStoryForTag.refetch()

  // }

  render() {
    return (
      <div>
        {/* STORY COMP */}
        <div className="heading-div">
          <div className="hello">Trending Stories!</div>
        </div>
        <section id="card">{this.displayStory()}</section>

        {/* Video Comp */}

        <div className="video-div">
          <h2 className="dashed-shadow hello">Video Feed</h2>
          <div className="video-div">{/* {this.getVideos()} */}</div>
        </div>

        {/* News Comp */}
        <div>
          <h2 className="dashed-shadow hello">News Feed</h2>
          <div className="news-div">{this.getNews()}</div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getStoryQuery, { name: "getStoryQuery" }),
  graphql(getStoryForTag, {
    name: "getStoryForTag",
    options: props => {
      return {
        variables: {
          tag: props.city
        },
        fetchPolicy: "no-cache"
      };
    }
  }),
  // graphql(getVideoQuery, {
  //     name: "getVideoQuery",
  //     options: (props) => {

  //         return {
  //             variables: {
  //                 query : props.city + 'Travel Vlogs',
  //                 limit: 2
  //             }
  //         }
  //     }
  // }),

  graphql(getNewsQuery, {
    name: "getNewsQuery",
    options: props => {
      return {
        variables: {
          query: props.city,
          limit: 2
        }
      };
    }
  })
)(MainComponent);
