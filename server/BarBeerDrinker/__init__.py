from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarBeerDrinker import database

app = Flask(__name__)

@app.route('/api/bar', methods=["GET"])
def get_bars():
    return jsonify(database.get_bars())


@app.route("/api/bar/<name>", methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beers_cheaper_than", methods=["POST"])
def find_beers_cheaper_than():
    body = json.loads(request.data)
    max_price = body['maxPrice']
    return jsonify(database.filter_beers(max_price))


@app.route('/api/menu/<name>', methods=['GET'])
def get_menu(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_bar_menu(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/bar-cities", methods=["GET"])
def get_bar_cities():
    try:
        return jsonify(database.get_bar_cities())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beer", methods=["GET"])
def get_beers():
    try:
        return jsonify(database.get_beers())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beer-manufacturer", methods=["GET"])
def get_beer_manufacturers():
    try:
        return jsonify(database.get_beer_manufacturers(None))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/beer-manufacturer/<beer>", methods=["GET"])
def get_manufacturers_making(beer):
    try:
        return jsonify(database.get_beer_manufacturers(beer))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/likes", methods=["GET"])
def get_likes():
    try:
        drinker = request.args.get("drinker")
        if drinker is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_likes(drinker))
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/drinker", methods=["GET"])
def get_drinkers():
    try:
        return jsonify(database.get_drinkers())
    except Exception as e:
        return make_response(str(e), 500)


@app.route("/api/drinker/<name>", methods=["GET"])
def get_drinker(name):
    try:
        if name is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_drinker_info(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/bars-selling/<beer>', methods=['GET'])
def find_bars_selling(beer):
    try:
        if beer is None:
            raise ValueError('Beer not specified')
        return jsonify(database.get_bars_selling(beer))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/frequents-data', methods=['GET'])
def get_bar_frequent_counts():
    try:
        return jsonify(database.get_bar_frequent_counts())
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/frequents-drinker', methods=['GET'])
def get_drinker_frequent_counts():
    try:
        return jsonify(database.get_drinker_frequent_counts())
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/avgprice', methods=['GET'])
def get_avg_price():
    try:
        return jsonify(database.get_avg_price())
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkerbeer/<name>', methods=['GET'])
def get_drinkerbeer(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        drinker = database.find_drinker(name)
        if drinker is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_drinker_beer(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/test/<name>', methods=['GET'])
def get_drinker_frequent_counts_by_bar(name):
    try:
        return jsonify(database.get_drinker_frequent_counts_by_bar(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beersales/<name>', methods=['GET'])
def beerSales(name):
    try:
        return jsonify(database.beerSales(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkersales/<name>', methods=['GET'])
def drinkerSales(name):
    try:
        return jsonify(database.drinkerSales(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/topbarsbybeer/<name>', methods=['GET'])
def barSales(name):
    try:
        return jsonify(database.barSales(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beerdrinkers/<name>', methods=['GET'])
def beerDrinkers(name):
    try:
        return jsonify(database.beerDrinkers(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beersdrankby/<name>', methods=['GET'])
def beersDrankBy(name):
    try:
        return jsonify(database.beersDrankBy(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/barsfrequentedby/<name>', methods=['GET'])
def barsFrequentedBy(name):
    try:
        return jsonify(database.barsFrequentedBy(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkermonth/<name>', methods=['GET'])
def drinkerByMonth(name):
    try:
        return jsonify(database.drinkerByMonth(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/drinkerweek/<name>', methods=['GET'])
def drinkerByWeek(name):
    try:
        return jsonify(database.drinkerByWeek(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/barmonth/<name>', methods=['GET'])
def barByMonth(name):
    try:
        return jsonify(database.barByMonth(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/barweek/<name>', methods=['GET'])
def barByWeekday(name):
    try:
        return jsonify(database.barByWeekday(name))
    except Exception as e:
        return make_response(str(e), 500)


@app.route('/api/barhour/<name>', methods=['GET'])
def barByHour(name):
    try:
        return jsonify(database.barByHour(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/beerhour/<name>', methods=['GET'])
def beerByHour(name):
    try:
        return jsonify(database.beerByHour(name))
    except Exception as e:
        return make_response(str(e), 500)

