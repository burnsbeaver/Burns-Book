class Api::BetsController < ApplicationController
  before_action :authenticate_user!
  include HTTParty
  base_uri 'https://jsonodds.com/api/odds'

  def findBets(league)
    response = get "/#{league}?oddtype=game",
      headers:{
      "JsonOdds-API-Key" => ""
    }
    render json: response
  end
  def create
    @user = current_user
    @book = @user.books.where(active: true).first
    @bet = @book.bets.new bet_params

    if @bet.save
      render json: @bet
    else
      render json: {
        message: 'Error when validating bet, please cancel and try again'
      }
    end
  end


  private

  def bet_params
    params.require(:bet).permit(:spread, :team, :gameID, :start, :oddtype, :open, :payout, :hometeam, :risk)
  end
end
