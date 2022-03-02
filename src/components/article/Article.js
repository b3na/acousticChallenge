import { useState, useEffect } from "react";
import "./Article.css";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import parse from "html-react-parser";
function Article() {
	const [article, setArticle] = useState({});

	function getArticleData() {
		return fetch(
			"https://content-eu-4.content-cms.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/db4930e9-7504-4d9d-ae6c-33facca754d1"
		)
			.then(response => response.json())
			.then(responseJson => {
				let parsedArticleData = {
					articleHeading: responseJson.elements.heading.value,
					articleDate: responseJson.elements.date.value,
					articleAuthor: responseJson.elements.author.value,
					articleImage:
						"https://content-eu-4.content-cms.com" +
						responseJson.elements.mainImage.value.leadImage.url,
					articleBody: responseJson.elements.body.values.map(
						numbers => <div>{parse(numbers)}</div> //parse html string to be able to render as an array of html tags
					),
				};
        console.log(parsedArticleData);
				setArticle(parsedArticleData);
			})
			.catch(error => {
				console.error(error);
			});
	}

	useEffect(() => {
		getArticleData();
	}, []);
  if(!article)
  return <><h3>Problem getting data from server. Please refresh</h3></>
	return (
		<>
			<Container className="pb-1 p-5 mb-4 bg-light rounded-3">
				<Row>
					<Col>
						<h1>{article.articleHeading}</h1>
						<div className="article-date mb-2">
							Posted on{" "}
							{new Date(article.articleDate).toDateString()} by{" "}
							{article.articleAuthor}
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<img
							src={article.articleImage}
							alt="articleImage"
							width="1200"
							height="624"
						></img>
					</Col>
					<Col>
						<Container className="body-container"> {article.articleBody}</Container>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Article;


