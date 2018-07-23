'use strict';

Search = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});

        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    },
    
    handleSeach: function(seatchingText) { // Pobierz na wejściu wpisywany tekst.
        this.setState({
            loading: true // Zasygnalizuj, że zaczął się proces ładowania.
        });
        this.getGif(searchingText, function(gif) { // Rozpocznij pobieranie gifa.
            this.setState({ // Na zakończenie pobierania:
                loading: false, // Przestań sygnalizować ładowanie.
                gif: gif, // Ustaw nowego gifa z wyniku pobierania.
                searchingText: seatchingText // Ustaw nowy stan dla wyszukiwanego tekstu.
            });
        }.bind(this));
    },

    handleKeyUP: function (event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    },

    render: function () {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px',
        };
        return 
            <input
                type = "text"
                onChange = {this.handleChange}
                placeholder = "Tutaj wpisz wyszukiwaną frazę"
                syle = {style}
                value = {this.state.searchTerm}
            />
    }
});