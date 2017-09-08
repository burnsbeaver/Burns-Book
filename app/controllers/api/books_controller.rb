class Api::BooksController < ApplicationController
  before_action :authenticate_user!
  def index
    @user = current_user
    @book = @user.books.where(active: true).first
    render json: @book
  end
end
