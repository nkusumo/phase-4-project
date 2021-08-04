class PostsController < ApplicationController
  before_action :set_post, only: [:show, :destroy] #delete
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    posts = Post.all
    render json: posts
  end

  #delete
  def show
    render json: post
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post, status: :created, location: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    # post = Post.find(params[:id])
    post.destroy
    render json: {}
  end

  def new_post
    song = Song.find_or_create_by(spotifyID: params[:spotifyID])
    post = Post.create(user_id: params[:user_id], song_id: song.id)
    render json: post
  end

  private

  #delete
  def set_post
    post = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:user_id, :song_id)
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { error: "Post not found" }, status: :not_found
  end
end
