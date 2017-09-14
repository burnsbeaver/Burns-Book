class Api::BooksController < ApplicationController
  before_action :authenticate_user!
  require 'time'
  def index
    @user = current_user
    @book = @user.books.where(active: true).first
    render json: @book
  end
  def show
    @user = current_user
    @book = @user.books.where(active: true).first
    @openbets = @book.bets.where(open: true)
    @closedbets = @book.bets.where(open: false)
    render json: {
      open: @openbets,
      closed: @closedbets
    }
  end
  # update
    #for each
  #end
  def resolve
    @user = current_user
    if @user.books.where(active: true).first
      @book = @user.books.where(active: true).first
    else

      @book = Book.create_new_book(@user)
    end
    @openbets = @book.bets.where(open: true)
    @time = Time.now.utc

    @openbets.each do |bet|
      puts @time.to_i
      puts bet.start.to_i
      next unless @time.to_i > bet.start.to_i
      puts'DOESNT WORK'
      puts bet[:spread]
      res = Bet.find_bet(bet[:gameID])
      res = res[0]

      # res = {'Final' => true, 'HomeScore' => nil, 'AwayScore' => nil}
      # res['HomeScore'] = rand(30).to_s
      # res['AwayScore'] = rand(25).to_s
      # puts res
      # puts bet

      if res["Final"] == true
        bet[:open] = false
        puts 'HOME?'
        puts bet[:homeTeam]
        puts 'HOMESCORE'
        puts res['HomeScore'].to_i
        puts 'AWAYSCORE'
        puts res['AwayScore'].to_i
        puts 'SPREAD'
        puts bet[:spread]
        if bet[:homeTeam]
          if bet[:spread] < 0
            if (res["HomeScore"].to_i - res["AwayScore"].to_i) > bet[:spread].abs
              bet[:win] = 'win'
              puts 'win 1'
            elsif (res["HomeScore"].to_i - res["AwayScore"].to_i) < bet[:spread].abs
              bet[:win] = 'loss'
              puts 'loss 1'
            else
              bet[:win] = 'draw'
            end
          elsif bet[:spread] > 0
            if (res["HomeScore"].to_i + bet[:spread]) > res["AwayScore"].to_i
              bet[:win] = 'win'
              puts 'win 2'
            elsif (res["HomeScore"].to_i + bet[:spread]) < res["AwayScore"].to_i
              bet[:win] = 'loss'
              puts 'loss 2'
            else
              bet[:win] = 'draw'
            end
          else
            if res["HomeScore"].to_i > res["AwayScore"].to_i
              bet[:win] = 'win'
              puts 'win 3'
            else
              bet[:win] = 'loss'
              puts 'loss 3'
            end
          end
        else
          if bet[:spread] < 0
            if (res["AwayScore"].to_i - res["HomeScore"].to_i) > bet[:spread].abs
              bet[:win] = 'win'
              puts 'win 4'
            elsif (res["AwayScore"].to_i - res["HomeScore"].to_i) < bet[:spread].abs
              bet[:win] = 'loss'
              puts 'loss 4'
            else
              bet[:win] = 'draw'
            end
          elsif bet[:spread] > 0
            if (res["AwayScore"].to_i + bet[:spread]) > res["HomeScore"].to_i
              bet[:win] = 'win'
              puts 'win 5'
            elsif (res["AwayScore"].to_i + bet[:spread]) < res["HomeScore"].to_i
              bet[:win] = 'loss'
              puts 'loss 5'
            else
              bet[:win] = 'draw'
            end
          else
            if res["AwayScore"].to_i > res["HomeScore"].to_i
              bet[:win] = 'win'
              puts 'win 6'
            else
              bet[:win] = 'loss'
              puts 'loss 6'
            end
          end
        end
        bet.save
      end
    end
    @closedbets = @book.bets.where(open: false)
    @number = 0
    @closedbets.each do |bet|
      if bet.win == 'win'
        puts bet.gameID
        puts 'WIN'
        @number = @number + bet.payout
      elsif bet.win == 'loss'
        puts bet.gameID
        puts 'LOSS'
        @number = @number - bet.risk
      end
    end
    @book[:balance] = @number
    @book.save
    render json: @book
  end
end
