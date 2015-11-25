import BaseView from '~/helpers/backbone/view';
import {props} from '~/helpers/backbone/decorators';
import {template} from './featured-books.hbs';
import featuredBooks from '~/models/featured-books';

require('./book.part.hbs');

@props({
    template: template,
    model: featuredBooks
})
export default class FeaturedBooks extends BaseView {

    initialize() {
        this.listenTo(this.model, 'reset', this.render);
    }

}
