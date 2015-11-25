import _ from 'underscore';
import BaseCollection from '~/helpers/backbone/collection';
import BaseModel from '~/helpers/backbone/model';
import {props} from '~/helpers/backbone/decorators';
import {cnxarchive} from 'settings';

const port = cnxarchive.port ? `:${cnxarchive.port}` : '';
const archive = `${location.protocol}//${cnxarchive.host}${port}`;

@props({
    url: `${archive}/extras`,
    model: BaseModel
})
class FeaturedBooks extends BaseCollection {

    initialize() {
        this.fetch({reset: true});
    }

    parse(response) {
        let books = [{
            type: 'OpenStax College',
            short: 'os-college',
            books: []
        }, {
            type: 'OpenStax CNX',
            short: 'os-cnx',
            books: []
        }];

        _.each(response.featuredLinks, (book) => {
            book.description = () => {
                let abstract = book.abstract;
                let abstractEl = document.createElement('div');

                abstractEl.innerHTML = abstract;

                let abstractText = abstractEl.textContent;

                if (abstract) {
                    return abstractText;
                }

                return '';
            };

            book.cover = `${archive}${book.resourcePath}`;
            book.link = `contents/${book.id}`;

            if (book.type === 'OpenStax Featured') {
                books[0].books.push(book);
            } else if (book.type === 'CNX Featured') {
                books[1].books.push(book);
            }
        });

        return books;
    }

}

let featuredBooks = new FeaturedBooks();

export default featuredBooks;
