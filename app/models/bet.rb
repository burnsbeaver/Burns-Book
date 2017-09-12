class Bet < ApplicationRecord
  belongs_to :book
  include HTTParty
  base_uri 'http://jsonodds.com/api'

  def self.find_bets(league)
    puts ENV['MY_API_KEY']
    response = get "/odds/#{league}?oddtype=game", {
      headers:{
      "JsonOdds-API-Key" => ENV['MY_API_KEY']
      }
    }
    response.body
  end
  def self.find_bet(gameID)
    response = get "/results/getbyeventid/#{gameID}?oddtype=game", {
      headers:{
      "JsonOdds-API-Key" => ENV['MY_API_KEY']
      }
    }

    response.body
  end
end
