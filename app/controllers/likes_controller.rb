class LikesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def create
        like = Like.create!(like_params)
        render json: like, status: :created
    end

    def destroy
        like = find_like
        like.destroy
        render json: {}
    end

    private

    def find_like
        Like.find(params[:id])
    end

    def like_params
        params.permit(:user_id, :post_id)
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Like not found" }, status: :not_found
    end

end
