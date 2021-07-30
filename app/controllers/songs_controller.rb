class SongsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        songs = Song.all
        render json: songs
    end

    def create
        song = Song.create!(song_params)
        render json: song, status: :created
    end

    def destroy
        song = find_song
        song.destroy
        render json: {}
    end

    private

    def find_song
        Song.find(params[:id])
    end

    def song_params
        params.permit(:name, :artist, :album, :year, :image)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
    def render_not_found_response
        render json: { error: "Song not found" }, status: :not_found
    end

end
