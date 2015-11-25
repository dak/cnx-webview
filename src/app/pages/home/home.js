import BaseView from '~/helpers/backbone/view';
import {props} from '~/helpers/backbone/decorators';
import FeaturedBooksView from './featured-books/featured-books';
import {template} from './home.hbs';

@props({
    template: template,
    regions: {
        featured: '.featured-books'
    }
})
export default class Home extends BaseView {

    onRender() {
        this.regions.featured.show(new FeaturedBooksView());
    }

}
