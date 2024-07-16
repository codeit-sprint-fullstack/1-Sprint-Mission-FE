// Importing Api
import * as ProductService from './services/ProductService.mjs';
import * as ArticleService from './services/ArticleService.mjs';

ArticleService.getArticleList(1, 100, '후기');
ArticleService.getArticle(3);
ArticleService.postArticle('New Post', 'New Post Content', 'String');
ArticleService.patchArticle(41, { content: 'Good' });
ArticleService.deleteArticle(43);

ProductService.getProductList(1, 10, '애플');
ProductService.getProduct(3);
ProductService.postProduct('초콜릿', '두바이 초콜릿', 100000, ['초콜릿', '간식'], ['url']);
ProductService.patchProduct(17, { price: 110000 });
ProductService.deleteProduct(17);