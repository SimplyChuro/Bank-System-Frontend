import Route from '@ember/routing/route';
import ResetScrollMixin from '../mixins/reset-scroll';
import LoadingSliderMixin from '../mixins/loading-slider';

export default Route.extend(ResetScrollMixin, LoadingSliderMixin, {
});