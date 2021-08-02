class LikeSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :user
  belongs_to :post

  # def user
  #   byebug
  # end
end
