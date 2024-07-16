// Importing Api
import * as ProductService from './services/ProductService.mjs';
import * as ArticleService from './services/ArticleService.mjs';

ArticleService.getArticleList(1, 100, '후기');
ArticleService.getArticle(3);
ArticleService.postArticle('New Post', 'New Post Content', 'String');
ArticleService.patchArticle(41, { content: 'Good' });
// ArticleService.deleteArticle(43);