class Bet < ApplicationRecord
  belongs_to :book
  include HTTParty
  base_uri 'https://jsonodds.com/api/odds'

  def self.findBets(league)
    puts 'Route was hit'
    response = get "/#{league}?oddtype=game", {
      headers:{
      "JsonOdds-API-Key" => ""
      }
    }
    response.body
  end
end
