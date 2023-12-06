from rest_framework import serializers
from .models import Product, Reviews


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.email")

    class Meta:
        model = Reviews
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

    def get_reviews(self, obj):
        reviews = obj.reviews_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
