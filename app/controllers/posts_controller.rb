class PostsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    posts = Post.all
    render json: posts
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
    post = Post.find(params[:id])
    post.destroy
    render json: {}
  end

  def new_post
    song = Song.find_or_create_by(spotifyID: params[:spotifyID])
    post = Post.create(user_id: params[:user_id], song_id: song.id)
    render json: post
  end

  def spotify_search
    # post to get access token
    token_response = RestClient.post("https://accounts.spotify.com/api/token", 
      {grant_type: 'client_credentials'},
      {Authorization: 'Basic MTI2NmE5ZjNhMDU4NDIzYzlkMThkYzJmZDUzYTdiODk6OTczYTQyYjU4NmQ5NGZiOWIzM2RhMzJhMzk2MTFmYTg='}
    )
    access_token = JSON.parse(token_response)["access_token"]

    # get to get song results
    searchString=params[:search].gsub(" ", "%20")
    search_response = RestClient.get("https://api.spotify.com/v1/search?q=#{searchString}&type=track&market=US&limit=3", {
      Authorization: "Bearer #{access_token}"
    })
    search_results = JSON.parse(search_response)["tracks"]["items"]
    render json: search_results
  end

  private

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
