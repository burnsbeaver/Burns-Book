class Bet < ApplicationRecord
  belongs_to :book
  include HTTParty
  base_uri 'http://jsonodds.com/api/odds'

  def self.find_bets(league)
    response = get "/#{league}?oddtype=game", {
      headers:{
      "JsonOdds-API-Key" => ""
      }
    }
    response.body
  end
end
