'use strict';

var GIPHY_API_URL = 'http://api.giphy.com';
var GIPHY_PUB_KEY = 'PE1pvqflpzm6OIu6vxHFpPK6e14Ulsap';

App = React.createClass({
    
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    
    handleSearch: function(searchingText) { // Pobierz na wejściu wpisywany tekst.
        this.setState({
            loading: true // Zasygnalizuj, że zaczął się proces ładowania.
        });
        this.getGif(searchingText, function(gif) { // Rozpocznij pobieranie gifa.
            this.setState({ // Na zakończenie pobierania:
                loading: false, // Przestań sygnalizować ładowanie.
                gif: gif, // Ustaw nowego gifa z wyniku pobierania.
                searchingText: searchingText // Ustaw nowy stan dla wyszukiwanego tekstu.
            });
        }.bind(this));
    },
    
    getGif: function(searchingText, callback) { // Na wejście metody getGif przyjmujemy dwa parametry: wpisywany tekst (searchingText) i funkcję, która ma się wykonać po pobraniu gifa (callback)
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText; // Konstruujemy adres URL dla API Giphy (pełną dokumentację znajdziesz pod tym adresem)
        var xhr = new XMLHttpRequest(); // Wywołujemy całą sekwencję tworzenia zapytania XHR do serwera i wysyłamy je.
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data; // W obiekcie odpowiedzi mamy obiekt z danymi. W tym miejscu rozpakowujemy je sobie do zmiennej data, aby nie pisać za każdym razem response.data.
                    var gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                callback(gif); // Przekazujemy obiekt do funkcji callback, którą przekazaliśmy jako drugi parametr metody getGif.
            }
        };
        xhr.send();
    },
    
    render: function() {
        
        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };
        
        return (
            <div style={styles}>
                <h1 style={{borderBottom: '1px solid black'}}>Wyszukiwarka GIFów</h1>
                <p>Znajdź gifa na <a href='http://giphy.com' target='_blank' style={{textDecoration: 'none', color: 'blue'}}>GIPHY.COM</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    }
});