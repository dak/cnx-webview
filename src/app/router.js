import Backbone from 'backbone';
import {props} from '~/helpers/backbone/decorators';
import appView from '~/components/shell/shell';

@props({
    routes: {
        '': 'home',
        '*actions': 'default'
    }
})
class Router extends Backbone.Router {

    home() {
        appView.render('home');
    }

    default() {
        appView.render('404');
    }

}

let router = new Router();

export default router;
