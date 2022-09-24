import Vue from 'vue';

import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		dark: true,
	    themes: {
		    light: {
		        primary: colors.blue.darken1, // #E53935
		        secondary: colors.blue.lighten4, // #FFCDD2
		        accent: colors.indigo.base, // #3F51B5
		    },
		    dark: {
		    	primary: colors.blue.darken1, // #E53935
		        secondary: colors.blue.lighten4, // #FFCDD2
		        accent: colors.indigo.base, // #3F51B5
		    }
	    },
	},
});
